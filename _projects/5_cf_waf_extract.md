---
layout: page
title: Cloudflare WAF Rules Extractor
description: Automated extraction and filtering of Cloudflare Custom Firewall Rules with parallel processing
img: assets/img/3.jpg
importance: 5
category: work
github: https://github.com/mainulhossain123/cloudflare-zones-WAF-extract
---

## Overview

An enterprise-grade Python tool for extracting and filtering Cloudflare Custom HTTP Firewall Rules (WAF) across all zones in an account. Built for SecOps and DevOps teams managing complex Cloudflare security configurations, this tool provides fast, action-filtered WAF rule exports for security audits, compliance documentation, and firewall policy reviews.

## Key Features

### Intelligent WAF Rule Extraction

- **Action-Based Filtering**: Filter rules by action type (skip, block, challenge, etc.)
- **Zone-Wide Scanning**: Processes all zones under a specified Cloudflare account
- **Custom Firewall Rules**: Targets `http_request_firewall_custom` ruleset phase
- **Detailed Rule Export**: Extracts rule ID, version, action, expression, description, last updated, and enabled status

### High-Performance Processing

- **Parallel Zone Processing**: Uses `ThreadPoolExecutor` (10 workers) for concurrent rule fetching
- **Retry Logic**: 3-attempt retry mechanism with exponential backoff
- **Session Pooling**: HTTP connection reuse via `requests.Session`
- **Pagination Support**: Handles large zone inventories (1000 zones per page)

### Enterprise Security Features

- **Timestamped Output**: Automatic CSV filename with UTC date stamps
- **Action Filtering**: Focus on specific rule actions (e.g., only "skip" rules for bypass analysis)
- **Audit-Ready Output**: Structured CSV format for compliance and security reviews
- **Environment-Based Config**: Secure API token management via environment variables

## Technology Stack

- **Language**: Python 3.7+
- **HTTP Client**: requests with session pooling
- **Concurrency**: concurrent.futures.ThreadPoolExecutor (10 workers)
- **API**: Cloudflare REST API v4 (/zones, /rulesets/phases)
- **Output Format**: CSV (comma-separated values)
- **Deployment**: Docker-ready (/app default directory)

## Architecture

1. **Zone Discovery**: Paginated fetch of all zones filtered by account name
2. **Parallel WAF Fetch**: Concurrent retrieval of custom firewall rulesets per zone
3. **Action Filtering**: Client-side filtering of rules by specified action type
4. **CSV Export**: Timestamped CSV output with detailed rule metadata

## Use Cases

- **Security Audits**: Generate comprehensive reports of WAF bypass rules (action: skip)
- **Compliance Documentation**: Export firewall policies for SOC2, ISO27001, PCI-DSS audits
- **Rule Optimization**: Identify redundant or obsolete firewall rules across zones
- **Incident Response**: Rapid inventory of block/challenge rules during security events
- **Policy Migration**: Export existing WAF configurations before zone transfers or provider changes

## Configuration

Environment variables:

- **API_KEY**: Cloudflare API token (Zone.Read + Zone Rulesets.Read permissions)
- **ACCOUNT_NAME**: Cloudflare account name (default: 'DXP Customers')
- **RULE_ACTION**: Filter by action type - 'skip', 'block', 'challenge', 'allow', etc. (default: 'skip')

## Example Usage

```bash
# Set environment variables
export API_KEY="your_token_here"
export ACCOUNT_NAME="Your Cloudflare Account Name"
export RULE_ACTION="skip"

# Run the script
python CF_Zones_WAF_Extract.py

# Output: firewall_custom_rules_2025-02-03.csv in /app/
```

### Sample CSV Output

| Zone Name   | Rule ID   | Version | Action | Expression                      | Description     | Last Updated | Enabled |
| ----------- | --------- | ------- | ------ | ------------------------------- | --------------- | ------------ | ------- |
| example.com | 82ab23... | 1       | skip   | (cf.zone.name eq "example.com") | API bypass rule | 2025-01-15   | true    |

## Sample Output Logs

```yaml
Zone Name: example.com, Rule ID: 82ab23..., Action: skip
Zone Name: anotherdomain.org, Rule ID: c3fd98..., Action: skip
```

## Docker Deployment

```bash
docker run -e API_KEY=$API_KEY \
  -e ACCOUNT_NAME="My Company" \
  -e RULE_ACTION="skip" \
  -v $(pwd):/app cf-waf-extract:latest
```

## CI/CD Integration

Ideal for scheduled security audits:

- **CRON Jobs**: Daily/weekly WAF rule snapshots
- **GitHub Actions**: Automated firewall policy reviews on merge requests
- **Kubernetes CronJobs**: Periodic compliance reporting in Kubernetes clusters

## Results & Impact

- **Security Visibility**: Complete inventory of custom firewall rules across all zones
- **Compliance Automation**: Automated WAF documentation for security audits
- **Operational Efficiency**: Parallel processing reduces scan time for 100+ zones to under 5 minutes
- **Incident Response**: Rapid identification of blocking/bypass rules during security events

---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3">
        <a href="https://github.com/mainulhossain123/cloudflare-zones-WAF-extract" class="btn btn-primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
        </a>
    </div>
</div>
